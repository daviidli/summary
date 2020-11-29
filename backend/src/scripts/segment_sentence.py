import getopt
import sys
import pysbd
import string

segmenter = pysbd.Segmenter(language="en", clean=False)


def clean_sentence(sentence):
    strip_chars = string.punctuation + " “”’‘—"
    return sentence.strip(strip_chars).lower()


def main(argv):
    opts, args = getopt.getopt(argv, '')

    if len(args) == 0:
        print('No arguments found', file=sys.stderr)

    sentences = segmenter.segment(args[0])
    cleaned_sentences = [clean_sentence(sentence) for sentence in sentences]
    print(cleaned_sentences)


if __name__ == "__main__":
    main(sys.argv[1:])
