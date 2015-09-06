#
# Script to generate csv of email events for testing from enron email corpus.
# To reproduce, download the full dataset from here https://www.cs.cmu.edu/~./enron/
# and unzip into the same directory as this file
#

import re
import csv
from glob import glob
from os import listdir
from dateutil.parser import parse


def rawImport(root='./maildir'):

  def rx(s): return re.compile(s, re.M)

  regexes = {
    "id"         : rx(r"Message-ID:(?:\s<(?P<id>.*)>)?"),
    "time"       : rx(r"Date: (.*)"),
    "sender"     : rx(r"From: (.*)"),
    "recipients" : rx(r"To: ((?:.|(?:\n|\r\n?)\s)*)"),
    "cc"         : rx(r"Cc: ((?:.|(?:\n|\r\n?)\s)*)"),
    "bcc"        : rx(r"Bcc: ((?:.|(?:\n|\r\n?)\s)*)")
  }

  newline = rx(r"(?:\n|\r\n?)")
  emailRx = rx(r"^\S+@\S+\.\S+$")
  added = set()

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
          R |= { r.strip() for r in record[rType].replace(';', ',').split(',') if emailRx.search(r.strip()) }

      return {
        'id': record['id'],
        'from': record['sender'],
        'time': int(parse(record['time']).strftime('%s')),
        'to': ",".join(R)
      }

  with open('./enron.csv', 'w') as csvfile:

    writer = csv.DictWriter(csvfile, fieldnames=['to', 'from', 'time'])
    writer.writeheader()

    rows = []

    for dirname in listdir(root):
      print('Processing {}...'.format(dirname))
      for f in glob("{}/{}/all_documents/*.".format(root, dirname)):
        record = process(f)
        if (record['to'] and record['from'] and record['time'] > 315522000 and not (record['id'] in added)):
          added.add(record['id'])
          del record['id']
          rows.append(record)


    writer.writerows(sorted(rows, lambda x, y: x['time'] - y['time']))


def altDataset(filename):

  # headers to use for CSV columns
  fieldnames = [
    "time",
    "message_identifier",
    "sender",
    "recipients",
    "topic",
    "mode"
  ]

  out = []
  with open(filename, "r") as csv_file:
    csv_iterator = csv.DictReader(csv_file, fieldnames=fieldnames)
    print("loading email data from {}...".format(filename))
    for row in csv_iterator:
      record = {
        "to" : ",".join(
          re.sub(r"[^\w@\|\.]", "", row["recipients"].lower()).split("|")
        ),
        "from" : re.sub(r"[^\w@\|\.]", "", row["sender"].lower()),
        "time" : int(float(row["time"]) / 1000)
      }
      if (any(record['to']) and record['from'] != ''):
        out.append(record)



  with open('alt-enron.csv', 'w') as out_csv:
    writer = csv.DictWriter(out_csv, fieldnames=['to', 'from', 'time'])
    writer.writeheader()
    writer.writerows(sorted(out, lambda x, y: x['time'] - y['time']))



if __name__ == '__main__':
  rawImport()
  #altDataset("./enron-event-history-all.csv")
