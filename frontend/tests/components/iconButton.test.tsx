import { render, screen } from "@testing-library/react";
import Background from "../../src/layout/Background";

describe("iconButton", () => {
    it("bg", () => {
        render(<Background>x</Background>);
        const tt = screen.getByText("x");
        expect(tt).toBeInTheDocument();
        expect(tt).toHaveTextContent(/x/i);
    });
});
