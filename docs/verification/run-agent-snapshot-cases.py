"""Run local snapshot cases without copying Agent source or calling an external model.
Usage: python docs/verification/run-agent-snapshot-cases.py <extracted-agent-root>
The source must expose run_live_comment_assist(..., use_llm=False).
"""
import json
from pathlib import Path
import sys

sys.stdout.reconfigure(encoding="utf-8")
sys.path.insert(0, str(Path(sys.argv[1]).resolve()))
from src.models import LiveComment, LiveCommentAssistInput
from src.modules.comment_intent import classify_comment
from src.modules.live_comment_assist import run_live_comment_assist

rows = []
for text in ["这个多少钱？", "这个咖啡酸不酸？", "多久能到？", "我想买这个", "质量太差了", "这个产地有什么故事？", "火星量子香蕉"]:
    intent = classify_comment(text)
    result = run_live_comment_assist(
        LiveCommentAssistInput(comment=LiveComment(username="audit", text=text)),
        use_llm=False,
    )
    rows.append({"text": text, "intent": intent.intent, "priority": intent.priority,
                 "confidence": intent.confidence, "translation": result.translated_text,
                 "translationStatus": "fallback_original" if result.translated_text == "[English] " + text else "dictionary",
                 "suggestedAction": result.suggested_action})
print(json.dumps({"mode": "English; use_llm=False; no external requests", "source": "agent-master (1).zip", "cases": rows}, ensure_ascii=False, indent=2))
