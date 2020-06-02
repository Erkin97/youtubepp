from googletrans import Translator
import argparse

translator = Translator()
parser = argparse.ArgumentParser()
parser.add_argument("text")
parser.add_argument("destination")

args = parser.parse_args()
text = args.text
dest = args.destination

result = translator.translate(text, dest = dest)
print(result.text)