export interface Citation {
  bookName: string;
  chapter: number;
  ranges: number[][];
  fullText: string;
  startIndex: number;
  endIndex: number;
}

export function parseAllCitations(text: string): Citation[] {
  const normalizedText = text.replace(/[–—]/g, '-');
  // const pattern =
  //   /\b(?<book>(?:[1-3]\s)?[A-Za-z]+(?:\s(?:of|and|the|[A-Za-z]+))*)\s+(?<chapter>\d+):(?<ranges>\d+(?:-\d+)?(?:\s*,\s*\d+(?:-\d+)?)*)/g;
  // const pattern =
  // /\b(?<book>(?:Song\s+of\s+Solomon)|(?:[1-3]\s)?[A-Za-z]+)\s+(?<chapter>\d+):(?<ranges>\d+(?:-\d+)?(?:,\s*\d+(?:-\d+)?)*)(?=[\s.,;:!?]|\s|$)/g;
  const pattern =
    /\b(?<book>(?:Song\s+of\s+Solomon)|(?:(?:[1-3]|I{1,3})\s)?[A-Za-z]+)\s+(?<chapter>\d+):(?<ranges>\d+(?:-\d+)?(?:,\s\d+(?:-\d+)?)*)(?=[\s.,;:!?)]|\s|$)/g;

  const citations: Citation[] = [];

  let match;
  while ((match = pattern.exec(normalizedText)) !== null) {
    if (!match.groups) continue;

    const { book, chapter, ranges } = match.groups;
    const fullText = match[0];

    const parsedRanges = ranges
      .split(/[,\s]/)
      .filter(Boolean)
      .map((range) => {
        const [start, end] = range.split('-').map(Number);
        return [start, end || start];
      });

    citations.push({
      bookName: book,
      chapter: parseInt(chapter, 10),
      ranges: parsedRanges,
      fullText,
      startIndex: match.index,
      endIndex: match.index + fullText.length,
    });
  }

  return citations;
}
