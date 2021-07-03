import { assertEquals, assertThrowsAsync, test } from "./deps.ts";
import * as popup from "./mod.ts";

test({
  name: "Basic usage",
  mode: "vim",
  fn: async (denops) => {
    await denops.cmd("new");
    const bufnr = 2;

    const winid = await popup.open(denops, bufnr, {
      row: 3,
      col: 3,
      width: 10,
      height: 10,
      topline: 1,
    });
    assertEquals(await popup.isVisible(denops, winid), true);
    assertEquals(await popup.info(denops, winid), {
      row: 3,
      col: 3,
      width: 10,
      height: 10,
      topline: 1,
    });

    await popup.move(denops, winid, {
      row: 5,
      col: 5,
      width: 12,
      height: 12,
      topline: 1,
    });
    assertEquals(await popup.isVisible(denops, winid), true);
    assertEquals(await popup.info(denops, winid), {
      row: 5,
      col: 5,
      width: 12,
      height: 12,
      topline: 1,
    });

    await popup.close(denops, winid);
    assertEquals(await popup.isVisible(denops, winid), false);
    await assertThrowsAsync(async () => {
      await popup.info(denops, winid); // should throw error because the window already closed.
    });
  },
});
