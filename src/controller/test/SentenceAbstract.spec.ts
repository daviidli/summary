import {expect} from "chai";
import SentenceText from "../SentenceText";

describe("SentenceAbstract FindSentences", () => {
    it ("should find no sentences", () => {
        const text: string = "";
        let response: string[] = [];

        try {
            const st: SentenceText = new SentenceText(text);
            response = st.getSentences();
        } catch (err) {
            response = err;
        } finally {
            expect(response).to.be.instanceOf(Error);
        }
    });

    it ("should find valid basic sentences (ends in [.!?;])", () => {
        const sentences: string[] = [
            "This is a sentence. ",
            "This is another sentence.\n",
            "Have you seen a sentence before? ",
            "John said: \"Hello world.\" ",
            "You can also end a sentence with an exclamation mark!\n",
            "Don't forget about the semi-colon; ",
            "and the sentence in brackets (like this one). ",
            "(Or like this one.) ",
            "Just a regular sentence."
        ];
        const correctResponse: string[] = [
            "This is a sentence.",
            "This is another sentence.",
            "Have you seen a sentence before?",
            "John said Hello world.",
            "You can also end a sentence with an exclamation mark!",
            "Don't forget about the semi-colon;",
            "and the sentence in brackets like this one.",
            "Or like this one.",
            "Just a regular sentence."
        ];
        const text: string = sentences.reduce((acc: string, v: string) => acc + v);
        let response: string[] = [];

        try {
            const st: SentenceText = new SentenceText(text);
            response = st.getSentences();
        } catch (err) {
            response = err;
        } finally {
            expect(response).to.deep.equal(correctResponse);
        }
    });

    it ("should find valid sentences with Mr/Mrs/Dr/period in numbers", () => {
        const sentences: string[] = [
            "Dr. Doe wrote this third sentence. ",
            "Mr. and Mrs. Doe helped write this sentence.\n",
            "Have you seen Ms. Doe? ",
            "And sentences with a number like $1.234 million."
        ];
        const correctResponse: string[] = [
            "Dr. Doe wrote this third sentence.",
            "Mr. and Mrs. Doe helped write this sentence.",
            "Have you seen Ms. Doe?",
            "And sentences with a number like $1.234 million."
        ];
        const text: string = sentences.reduce((acc: string, v: string) => acc + v);
        let response: string[] = [];

        try {
            const st: SentenceText = new SentenceText(text);
            response = st.getSentences();
        } catch (err) {
            response = err;
        } finally {
            expect(response).to.deep.equal(correctResponse);
        }
    });
});