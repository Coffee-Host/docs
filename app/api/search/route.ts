import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';
import { createTokenizer } from '@orama/tokenizers/mandarin';

const tokenizer = createTokenizer();
const originalTokenize = tokenizer.tokenize;

// 覆寫 tokenizer 讓所有輸入都在分詞前轉為小寫，達到忽略大小寫的搜尋效果
tokenizer.tokenize = (raw, language, prop, config) => {
  return originalTokenize(typeof raw === 'string' ? raw.toLowerCase() : raw, language, prop, config);
};

export const { GET } = createFromSource(source, {
  components: {
    tokenizer: tokenizer,
  },
  search: {
    threshold: 0,
    tolerance: 0,
  },
});