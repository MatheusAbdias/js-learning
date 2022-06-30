const readFile = require("../index");
describe("test readFile function", () => {
    it("is call back", () => {
        expect(typeof readFile).toBe("function");
    })
    it("Test get all links in file.md", async () => {
        const links = await readFile("./tests/arquivos/sample_text.md");

        expect(links.length).toBe(1);
    })
    it("Test passing no links in file.md", async () => {
        const links = await readFile("./tests/arquivos/sample_invalid_text.md")

        expect(links).toBe('No have links in file');
    })
})