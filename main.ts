// One Word for the Boss — a single word describing your boss, at most 30
// characters, funny and true. Writes it to /output/entry.txt.
import { mkdir, writeFile } from "node:fs/promises";

const WORD = "ReplyAll";
const LIMIT = 30;
const TARGET = "/output/entry.txt";

function makeEmitter() {
  async function validate(word: string): Promise<number> {
    const size = [...word].length;
    if (size < 1) throw new Error("word is empty");
    if (size > LIMIT) throw new Error(`word is ${size} chars, over the ${LIMIT} limit`);
    if (/\s/.test(word)) throw new Error("word must contain no whitespace");
    return size;
  }

  return {
    async emit(word: string): Promise<void> {
      const size = await validate(word);
      await mkdir("/output", { recursive: true });
      await writeFile(TARGET, word, "utf8");
      console.log(`wrote "${word}" (${size} chars) to ${TARGET}`);
    },
  };
}

const emitter = makeEmitter();
await emitter.emit(WORD);
