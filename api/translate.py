from googletrans import Translator
import argparse

translator = Translator()
parser = argparse.ArgumentParser()
parser.add_argument("text")

args = parser.parse_args()
text = args.text

result = translator.translate(text)
print(result.text)