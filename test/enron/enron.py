import re
import csv
from glob import glob
from os import listdir

def rx(s):
  return re.compile(s, re.M)

regexes = {
  "id"      : rx(r"Message-ID:(?:\s<(?P<id>.*)>)?"),
  "date"       : rx(r"Date: (.*)"),
  "sender"     : rx(r"From: (.*)"),
  "recipients" : rx(r"To: ((?:.|(?:\n|\r\n?)\s)*)"),
  "cc"         : rx(r"Cc: ((?:.|(?:\n|\r\n?)\s)*)"),
  "bcc"        : rx(r"Bcc: ((?:.|(?:\n|\r\n?)\s)*)")
}

newline = rx(r"(?:\n|\r\n?)")


def process(file):
  with open(file) as intext:
    record = {}
    email = intext.read()

    for name, regex in regexes.items():
      match = regex.search(email)
      if (match):
        record[name] = newline.sub('', match.group(1))

    R = set()
    for rType in ['recipients', 'bcc', 'cc']:
      if rType in record:
        R |= { r.strip() for r in record[rType].split(',') }

    return {
      'id': record['id'],
      'from': record['sender'],
      'date': record['date'],
      'to': ",".join(R)
    }


if __name__ == '__main__':

  with open('./enron_emails.csv', 'w') as csvfile:

    root = './maildir'
    writer = csv.DictWriter(csvfile, fieldnames=['id', 'to', 'from', 'date'])
    writer.writeheader()

    for dirname in listdir(root):
      print('Processing {}...'.format(dirname))
      writer.writerows(
        process(f)
        for f in glob("{}/{}/sent/*".format(root, dirname))
      )
