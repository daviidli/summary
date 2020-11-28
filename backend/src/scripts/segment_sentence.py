import pysbd
import string

segmenter = pysbd.Segmenter(language="en", clean=False)


def clean_sentence(sentence):
    strip_chars = string.punctuation + " “”’‘—"
    return sentence.strip(strip_chars).lower()


def main():
    data = open('src/scripts/data.txt', 'r')
    try:
        sentences = segmenter.segment(data.read())
        cleaned_sentences = [clean_sentence(sentence) for sentence in sentences]
        print(cleaned_sentences)
    finally:
        data.close()


if __name__ == "__main__":
    main()