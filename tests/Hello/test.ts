import hello from "../../src/index";

test('Hello, world!', () => {
    expect(
        hello()
    ).toBe('Hello, world!')
})