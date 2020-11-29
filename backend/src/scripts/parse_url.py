import getopt
import sys
from newspaper import Article


def clean_text(text):
    return text.replace("\n\n", " ").replace("\n", "")


def main(argv):
    opts, args = getopt.getopt(argv, '')
    print(args);

    if len(args) == 0:
        print('No URL found', file=sys.stderr)

    article = Article(args[0])
    article.download()
    article.parse()

    print(clean_text(article.text))


if __name__ == "__main__":
    main(sys.argv[1:])
