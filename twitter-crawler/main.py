#!/usr/bin/env python
# -*- coding: utf-8 -*-

from twython import Twython
import argparse
import os

from pymongo import MongoClient
import json


# Parsing command-line args
parser = argparse.ArgumentParser(description='Tweet crawler')
parser.add_argument('-nort', action="store_true", dest="nort", default=False, help='disable retweets')
parser.add_argument('-htags', action="store", dest="htags", nargs='*', help='hashtags to query', required=True)
parser.add_argument('-c', action="store", dest="count", type=int, help='tweets count to query', required=True)
args = parser.parse_args()


# Setup twitter api
TWITTER_API_KEY = os.environ['TWITTER_API_KEY']
TWITTER_API_KEY_SECRET = os.environ['TWITTER_API_KEY_SECRET']
TWITTER_ACCESS_TOKEN = os.environ['TWITTER_ACCESS_TOKEN']
TWITTER_ACCESS_TOKEN_SECRET = os.environ['TWITTER_ACCESS_TOKEN_SECRET']


t = Twython(app_key=TWITTER_API_KEY, 
            app_secret=TWITTER_API_KEY_SECRET, 
            oauth_token=TWITTER_ACCESS_TOKEN, 
            oauth_token_secret=TWITTER_ACCESS_TOKEN_SECRET)


mongoCLient = MongoClient('mongodb://localhost:27017/')
db = mongoCLient['msi_crawler']
collection = db['msi_sp']

# Creating query from command-line args
query = ""
for htag in args.htags:
    if query == "":
        query += "#" + htag
    else:
        query += " OR #" + htag

if args.nort:
    query += "-filter:retweets"

print 'query:', query

with open('since_id.dat', 'r') as f_read:
    since_id = f_read.readline()

# Searching
if (since_id == ''):
    search = t.search(q=query, count=args.count)
else:
    search = t.search(q=query, count=args.count, since_id=since_id)

tweets = search['statuses']

tweet_docs = []

# Inserting mongo
for tweet in tweets:

    tweet_doc = {
        'tweet_id': tweet['id_str'],
        'text': tweet['text'].encode('utf-8'),
        'date': tweet['created_at'],
        'rt': tweet['retweeted']
    }

    tweet_docs.append(tweet_doc)

    if tweet_doc['tweet_id'] > since_id:
        since_id = tweet_doc['tweet_id']

collection.insert_many(tweet_docs)
print 'Found {0} new tweets'.format(len(tweet_docs))

with open('since_id.dat', 'w') as f_write:
    f_write.write(since_id)
