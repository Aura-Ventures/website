export const BOOK_COVER_MAP: Record<string, string> = {
  gen: 'Genesis.png', exod: 'Genesis.png', lev: 'Genesis.png', num: 'Genesis.png', deut: 'Genesis.png',
  josh: 'Joshua.png', judg: 'Joshua.png', ruth: 'Joshua.png', '1sam': 'Joshua.png', '2sam': 'Joshua.png',
  '1kgs': 'Joshua.png', '2kgs': 'Joshua.png', '1chr': 'Joshua.png', '2chr': 'Joshua.png', ezra: 'Joshua.png',
  neh: 'Joshua.png', esth: 'Joshua.png', job: 'Job.png', ps: 'Job.png', prov: 'Job.png', eccl: 'Job.png',
  song: 'Job.png', isa: 'Isaiah.png', jer: 'Isaiah.png', lam: 'Isaiah.png', ezek: 'Isaiah.png', dan: 'Isaiah.png',
  hos: 'Hosea.png', joel: 'Hosea.png', amos: 'Hosea.png', obad: 'Hosea.png', jonah: 'Hosea.png', mic: 'Hosea.png',
  nah: 'Hosea.png', hab: 'Hosea.png', zeph: 'Hosea.png', hag: 'Hosea.png', zech: 'Hosea.png', mal: 'Hosea.png',
  matt: 'Matthew.png', mark: 'Matthew.png', luke: 'Matthew.png', john: 'Matthew.png', acts: 'Acts.png',
  rom: 'Romans.png', '1cor': 'Romans.png', '2cor': 'Romans.png', gal: 'Romans.png', eph: 'Romans.png',
  phil: 'Romans.png', col: 'Romans.png', '1thess': 'Romans.png', '2thess': 'Romans.png', '1tim': 'Romans.png',
  '2tim': 'Romans.png', titus: 'Romans.png', phlm: 'Romans.png', heb: 'Hebrews.png', jas: 'Hebrews.png',
  '1pet': 'Hebrews.png', '2pet': 'Hebrews.png', '1john': 'Hebrews.png', '2john': 'Hebrews.png', '3john': 'Hebrews.png',
  jude: 'Hebrews.png', rev: 'Revelation.png',
};
  
export const STANDARD_BOOK_NAME_MAP: Record<string, string> = {
  'Genesis': 'gen',
  'Exodus': 'exod',
  'Leviticus': 'lev',
  'Numbers': 'num',
  'Deuteronomy': 'deut',
  'Joshua': 'josh',
  'Judges': 'judg',
  'Ruth': 'ruth',
  '1 Samuel': '1sam',
  '2 Samuel': '2sam',
  '1 Kings': '1kgs',
  '2 Kings': '2kgs',
  '1 Chronicles': '1chr',
  '2 Chronicles': '2chr',
  'Ezra': 'ezra',
  'Nehemiah': 'neh',
  'Esther': 'esth',
  'Job': 'job',
  'Psalms': 'ps',
  'Proverbs': 'prov',
  'Ecclesiastes': 'eccl',
  'Song of Solomon': 'song',
  'Isaiah': 'isa',
  'Jeremiah': 'jer',
  'Lamentations': 'lam',
  'Ezekiel': 'ezek',
  'Daniel': 'dan',
  'Hosea': 'hos',
  'Joel': 'joel',
  'Amos': 'amos',
  'Obadiah': 'obad',
  'Jonah': 'jonah',
  'Micah': 'mic',
  'Nahum': 'nah',
  'Habakkuk': 'hab',
  'Zephaniah': 'zeph',
  'Haggai': 'hag',
  'Zechariah': 'zech',
  'Malachi': 'mal',
  'Matthew': 'matt',
  'Mark': 'mark',
  'Luke': 'luke',
  'John': 'john',
  'Acts': 'acts',
  'Romans': 'rom',
  '1 Corinthians': '1cor',
  '2 Corinthians': '2cor',
  'Galatians': 'gal',
  'Ephesians': 'eph',
  'Philippians': 'phil',
  'Colossians': 'col',
  '1 Thessalonians': '1thess',
  '2 Thessalonians': '2thess',
  '1 Timothy': '1tim',
  '2 Timothy': '2tim',
  'Titus': 'titus',
  'Philemon': 'phlm',
  'Hebrews': 'heb',
  'James': 'jas',
  '1 Peter': '1pet',
  '2 Peter': '2pet',
  '1 John': '1john',
  '2 John': '2john',
  '3 John': '3john',
  'Jude': 'jude',
  'Revelation': 'rev',
};

const coverGlob = import.meta.glob<string | { src?: string }>('~/assets/images/bookcovers/*.png', {
  eager: true,
  import: 'default',
});
const FILENAME_TO_URL: Record<string, string> = {};
for (const path of Object.keys(coverGlob)) {
  const name = path.split('/').pop()?.replace(/\?.*$/, '') || '';
  const val = coverGlob[path] as string | { src?: string };
  const url = typeof val === 'string' ? val : val?.src;
  if (name && url) FILENAME_TO_URL[name] = url;
}

export function getBookShortId(bookId: string): string | undefined {
  let t = bookId?.trim();
  if (!t) return undefined;
  while (t) {
    const byFull = STANDARD_BOOK_NAME_MAP[t];
    if (byFull) return byFull;
  }
  return undefined;
}

export function getBookCoverSrc(bookId: string): string | undefined {
  const shortId = getBookShortId(bookId);
  if (!shortId) return undefined;
  const filename = BOOK_COVER_MAP[shortId];
  if (!filename) return undefined;
  return FILENAME_TO_URL[filename] ;
}