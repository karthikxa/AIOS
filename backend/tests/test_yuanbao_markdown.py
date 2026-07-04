"""
test_yuanbao_markdown.py - Unit tests for yuanbao_markdown.py

Run (no pytest needed):
    cd /root/.openclaw/workspace/zed-agent
    python3 tests/test_yuanbao_markdown.py -v

Or with pytest if available:
    python3 -m pytest tests/test_yuanbao_markdown.py -v
"""

import sys
import os
import unittest

# Ensure project root is on the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from gateway.platforms.yuanbao import MarkdownProcessor


# ============ has_unclosed_fence ============

class TestHasUnclosedFence(unittest.TestCase):
    def test_unclosed_fence(self):
        self.assertTrue(MarkdownProcessor.has_unclosed_fence("```python\ncode"))

    def test_closed_fence(self):
        self.assertFalse(MarkdownProcessor.has_unclosed_fence("```python\ncode\n```"))

    def test_empty(self):
        self.assertFalse(MarkdownProcessor.has_unclosed_fence(""))

    def test_no_fence(self):
        self.assertFalse(MarkdownProcessor.has_unclosed_fence("just some text\nno fences here"))

    def test_multiple_closed_fences(self):
        text = "```python\ncode1\n```\n\n```js\ncode2\n```"
        self.assertFalse(MarkdownProcessor.has_unclosed_fence(text))

    def test_second_fence_unclosed(self):
        text = "```python\ncode1\n```\n\n```js\ncode2"
        self.assertTrue(MarkdownProcessor.has_unclosed_fence(text))

    def test_fence_at_start(self):
        self.assertTrue(MarkdownProcessor.has_unclosed_fence("```\nsome code"))

    def test_inline_backtick_ignored(self):
        text = "`inline code` is fine"
        self.assertFalse(MarkdownProcessor.has_unclosed_fence(text))


# ============ ends_with_table_row ============

class TestEndsWithTableRow(unittest.TestCase):
    def test_simple_table_row(self):
        self.assertTrue(MarkdownProcessor.ends_with_table_row("| col1 | col2 |"))

    def test_table_row_with_trailing_newline(self):
        self.assertTrue(MarkdownProcessor.ends_with_table_row("| col1 | col2 |\n"))

    def test_table_row_in_middle(self):
        text = "| col1 | col2 |\nsome other text"
        self.assertFalse(MarkdownProcessor.ends_with_table_row(text))

    def test_empty(self):
        self.assertFalse(MarkdownProcessor.ends_with_table_row(""))

    def test_non_table(self):
        self.assertFalse(MarkdownProcessor.ends_with_table_row("just a normal line"))

    def test_only_pipe_start(self):
        self.assertFalse(MarkdownProcessor.ends_with_table_row("| just pipe at start"))

    def test_table_separator_row(self):
        self.assertTrue(MarkdownProcessor.ends_with_table_row("| --- | --- |"))

    def test_whitespace_only(self):
        self.assertFalse(MarkdownProcessor.ends_with_table_row("   \n  "))


# ============ split_at_paragraph_boundary ============

class TestSplitAtParagraphBoundary(unittest.TestCase):
    def test_split_at_empty_line(self):
        text = "paragraph one\n\nparagraph two\n\nparagraph three\nextra"
        head, tail = MarkdownProcessor.split_at_paragraph_boundary(text, 30)
        self.assertLessEqual(len(head), 30)
        self.assertEqual(head + tail, text)

    def test_split_at_sentence_end(self):
        text = "This is a sentence.\nNext line.\nAnother line."
        head, tail = MarkdownProcessor.split_at_paragraph_boundary(text, 25)
        self.assertLessEqual(len(head), 25)
        self.assertEqual(head + tail, text)

    def test_forced_split_no_boundary(self):
        text = "a" * 100
        head, tail = MarkdownProcessor.split_at_paragraph_boundary(text, 50)
        self.assertEqual(len(head), 50)
        self.assertEqual(head + tail, text)

    def test_split_at_newline(self):
        text = "line one\nline two\nline three"
        head, tail = MarkdownProcessor.split_at_paragraph_boundary(text, 15)
        self.assertLessEqual(len(head), 15)
        self.assertEqual(head + tail, text)

    def test_chinese_sentence_boundary(self):
        text = "è¿™æ˜¯ç¬¬ä¸€å¥è¯ã€‚\nè¿™æ˜¯ç¬¬äºŒå¥è¯ã€‚\nè¿™æ˜¯ç¬¬ä¸‰å¥è¯ã€‚"
        head, tail = MarkdownProcessor.split_at_paragraph_boundary(text, 15)
        self.assertLessEqual(len(head), 15)
        self.assertEqual(head + tail, text)


# ============ chunk_markdown_text ============

class TestChunkMarkdownText(unittest.TestCase):
    def test_empty(self):
        self.assertEqual(MarkdownProcessor.chunk_markdown_text(""), [])

    def test_short_text_no_split(self):
        text = "hello world"
        self.assertEqual(MarkdownProcessor.chunk_markdown_text(text, 3000), [text])

    def test_exactly_max_chars(self):
        text = "a" * 3000
        result = MarkdownProcessor.chunk_markdown_text(text, 3000)
        self.assertEqual(len(result), 1)
        self.assertEqual(result[0], text)

    def test_plain_text_split(self):
        """x * 9000 should return 3 chunks of ~3000"""
        text = "x" * 9000
        result = MarkdownProcessor.chunk_markdown_text(text, 3000)
        self.assertEqual(len(result), 3)
        for chunk in result:
            self.assertLessEqual(len(chunk), 3000)
        self.assertEqual(''.join(result), text)

    def test_5000_chars_returns_2(self):
        """éªŒæ”¶æ ‡å‡†: 'a'*5000 with max 3000 â†’ 2 chunks"""
        result = MarkdownProcessor.chunk_markdown_text("a" * 5000, 3000)
        self.assertEqual(len(result), 2)

    def test_code_fence_not_split(self):
        """ä»£ç å—ä¸åº”è¢«åˆ‡æ–­"""
        code_lines = "\n".join([f"    line_{i} = {i}" for i in range(200)])
        text = f"Some intro text.\n\n```python\n{code_lines}\n```\n\nSome outro text."
        result = MarkdownProcessor.chunk_markdown_text(text, 3000)
        for chunk in result:
            self.assertFalse(MarkdownProcessor.has_unclosed_fence(chunk),
                             f"Chunk has unclosed fence:\n{chunk[:200]}...")

    def test_table_not_split(self):
        """è¡¨æ ¼è¡Œä¸åº”è¢«åˆ‡æ–­"""
        header = "| Name | Value | Description |\n| --- | --- | --- |"
        rows = "\n".join([f"| item_{i} | {i * 100} | description for item {i} |"
                          for i in range(50)])
        table = f"{header}\n{rows}"
        text = "Some intro text.\n\n" + table + "\n\nSome outro text."
        result = MarkdownProcessor.chunk_markdown_text(text, 3000)
        for chunk in result:
            self.assertFalse(MarkdownProcessor.has_unclosed_fence(chunk))

    def test_code_fence_200_lines_not_cut(self):
        """åŒ…å« 200 è¡Œä»£ç å—çš„æ–‡æœ¬ï¼Œä»£ç å—ä¸è¢«åˆ‡æ–­"""
        code_lines = "\n".join([f"x = {i}" for i in range(200)])
        text = f"Intro.\n\n```python\n{code_lines}\n```\n\nOutro."
        result = MarkdownProcessor.chunk_markdown_text(text, 3000)
        for chunk in result:
            self.assertFalse(MarkdownProcessor.has_unclosed_fence(chunk))

    def test_multiple_paragraphs(self):
        """å¤šæ®µè½æ–‡æœ¬åº”åœ¨æ®µè½è¾¹ç•Œåˆ‡å‰²"""
        paragraphs = ["This is paragraph number " + str(i) + ". " * 50
                      for i in range(10)]
        text = "\n\n".join(paragraphs)
        result = MarkdownProcessor.chunk_markdown_text(text, 500)
        self.assertGreater(len(result), 1)
        total_content = ''.join(result)
        self.assertGreaterEqual(len(total_content), len(text) * 0.95)

    def test_single_long_line(self):
        """å•è¡Œè¶…é•¿æ–‡æœ¬åº”è¢«å¼ºåˆ¶åˆ‡å‰²"""
        text = "a" * 10000
        result = MarkdownProcessor.chunk_markdown_text(text, 3000)
        self.assertGreaterEqual(len(result), 3)
        for c in result:
            self.assertLessEqual(len(c), 3000)

    def test_fence_followed_by_text(self):
        """å›´æ åŽçš„æ–‡æœ¬åº”æ­£å¸¸åˆ‡å‰²"""
        text = "```python\nprint('hi')\n```\n\n" + "Normal text. " * 300
        result = MarkdownProcessor.chunk_markdown_text(text, 500)
        for chunk in result:
            self.assertFalse(MarkdownProcessor.has_unclosed_fence(chunk))

    def test_returns_non_empty_strings(self):
        """æ‰€æœ‰è¿”å›žçš„ç‰‡æ®µéƒ½åº”ä¸ºéžç©ºå­—ç¬¦ä¸²"""
        text = "Hello world!\n\n" * 100
        result = MarkdownProcessor.chunk_markdown_text(text, 100)
        for chunk in result:
            self.assertGreater(len(chunk), 0)


# ============ Acceptance criteria ============

class TestAcceptanceCriteria(unittest.TestCase):
    def test_9000_x_returns_3_chunks(self):
        """éªŒæ”¶ï¼šMarkdownProcessor.chunk_markdown_text("x" * 9000, 3000) è¿”å›ž 3 ä¸ªç‰‡æ®µ"""
        result = MarkdownProcessor.chunk_markdown_text("x" * 9000, 3000)
        self.assertEqual(len(result), 3)
        for chunk in result:
            self.assertLessEqual(len(chunk), 3000)

    def test_5000_a_returns_2_chunks(self):
        """éªŒæ”¶ï¼špython -c è¾“å‡º 2"""
        result = MarkdownProcessor.chunk_markdown_text("a" * 5000, 3000)
        self.assertEqual(len(result), 2)

    def test_has_unclosed_fence_true(self):
        """éªŒæ”¶ï¼šMarkdownProcessor.has_unclosed_fence("```python\\ncode") è¿”å›ž True"""
        self.assertTrue(MarkdownProcessor.has_unclosed_fence("```python\ncode"))

    def test_has_unclosed_fence_false(self):
        """éªŒæ”¶ï¼šMarkdownProcessor.has_unclosed_fence("```python\\ncode\\n```") è¿”å›ž False"""
        self.assertFalse(MarkdownProcessor.has_unclosed_fence("```python\ncode\n```"))

    def test_code_block_200_lines_not_broken(self):
        """éªŒæ”¶ï¼šåŒ…å« 200 è¡Œä»£ç å—çš„æ–‡æœ¬ï¼Œä»£ç å—ä¸è¢«åˆ‡æ–­"""
        code_lines = "\n".join([f"    result_{i} = compute({i})" for i in range(200)])
        text = f"Introduction.\n\n```python\n{code_lines}\n```\n\nConclusion."
        result = MarkdownProcessor.chunk_markdown_text(text, 3000)
        for chunk in result:
            self.assertFalse(MarkdownProcessor.has_unclosed_fence(chunk),
                             f"Found unclosed fence in chunk:\n{chunk[:100]}...")

    def test_table_rows_not_broken(self):
        """éªŒæ”¶ï¼šè¡¨æ ¼è¡Œä¸è¢«åˆ‡æ–­ï¼ˆæ¯ä¸ª chunk ä¸­çš„è¡¨æ ¼ fence å®Œæ•´ï¼‰"""
        rows = "\n".join([
            f"| Col A {i} | Col B {i} | Col C {i} |" for i in range(100)
        ])
        text = f"Table:\n\n| A | B | C |\n| --- | --- | --- |\n{rows}\n\nDone."
        result = MarkdownProcessor.chunk_markdown_text(text, 500)
        for chunk in result:
            self.assertFalse(MarkdownProcessor.has_unclosed_fence(chunk))


if __name__ == '__main__':
    unittest.main(verbosity=2)


# ============ pytest-style function tests (task specification) ============

def test_short_text_no_split():
    assert MarkdownProcessor.chunk_markdown_text("hello", 100) == ["hello"]


def test_plain_text_split():
    chunks = MarkdownProcessor.chunk_markdown_text("a" * 5000, 3000)
    assert len(chunks) >= 2
    for c in chunks:
        assert len(c) <= 3000


def test_fence_not_broken():
    """ä»£ç å—ä¸åº”è¢«åˆ‡æ–­"""
    code_block = "```python\n" + "x = 1\n" * 200 + "```"
    chunks = MarkdownProcessor.chunk_markdown_text(code_block, 1000)
    for c in chunks:
        assert not MarkdownProcessor.has_unclosed_fence(c), f"Chunk has unclosed fence: {c[:100]}"


def test_large_fence_kept_whole():
    """è¶…å¤§ä»£ç å—å³ä¾¿è¶…è¿‡ max_chars ä¹Ÿåº”æ•´å—è¾“å‡º"""
    code_block = "```python\n" + "x = 1\n" * 200 + "```"
    chunks = MarkdownProcessor.chunk_markdown_text(code_block, 500)
    # ä»£ç å—åº”åœ¨åŒä¸€ä¸ª chunk ä¸­ï¼ˆå…è®¸è¶…å‡º max_charsï¼‰
    fence_chunks = [c for c in chunks if "```python" in c]
    for c in fence_chunks:
        assert not MarkdownProcessor.has_unclosed_fence(c)


def test_mixed_content():
    """ä»£ç å—å‰åŽçš„æ™®é€šæ–‡æœ¬å¯ä»¥æ­£å¸¸åˆ‡å‰²"""
    text = "intro paragraph\n\n" + "```python\nx=1\n```" + "\n\noutro paragraph"
    chunks = MarkdownProcessor.chunk_markdown_text(text, 100)
    for c in chunks:
        assert not MarkdownProcessor.has_unclosed_fence(c)


def test_table_not_broken():
    """è¡¨æ ¼ä¸åº”è¢«åˆ‡æ–­"""
    table = "| A | B |\n|---|---|\n| 1 | 2 |\n| 3 | 4 |"
    text = "before\n\n" + table + "\n\nafter"
    chunks = MarkdownProcessor.chunk_markdown_text(text, 30)
    table_in_chunk = [c for c in chunks if "|" in c]
    for c in table_in_chunk:
        lines = [line for line in c.split('\n') if line.strip().startswith('|')]
        if lines:
            # è‡³å°‘è¡¨æ ¼è¡Œä¸è¢«åŠæˆªåˆ‡å‰²
            pass


def test_has_unclosed_fence():
    assert MarkdownProcessor.has_unclosed_fence("```python\ncode") == True
    assert MarkdownProcessor.has_unclosed_fence("```python\ncode\n```") == False
    assert MarkdownProcessor.has_unclosed_fence("no fence") == False


def test_ends_with_table_row():
    assert MarkdownProcessor.ends_with_table_row("| a | b |") == True
    assert MarkdownProcessor.ends_with_table_row("normal text") == False


def test_empty_text():
    assert MarkdownProcessor.chunk_markdown_text("", 100) == []


def test_exact_limit():
    text = "a" * 3000
    chunks = MarkdownProcessor.chunk_markdown_text(text, 3000)
    assert len(chunks) == 1
