#!/usr/bin/env python
# -*- coding: utf-8 -*-

from twython import Twython
import argparse
import os

from pymongo import MongoClient
import json


# Parsing command-line args
parser = argparse.ArgumentParser(description='Tweet crawler')
parser.add_argument('-db', action="store", dest="db", help="mongo db name", required=True)
parser.add_argument('-collection', action="store", dest="collection", help="mongo collection name", required=True)
parser.add_argument('-nort', action="store_true", dest="nort", default=False, help='disable retweets')
parser.add_argument('-htags', action="store", dest="htags", nargs='*', help='hashtags to query', required=True)
parser.add_argument('-c', action="store", dest="count", type=int, help='tweets count to query', required=True)
parser.add_argument('-sinceid', action="store", dest="sinceid", help='tweets count to query')
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

mongoCLient = MongoClient('mongodb://10.20.43.127:27017/')
db = mongoCLient[args.db]
collection = db[args.collection]

# Creating query from command-line args
query = ""
for htag in args.htags:
    if query == "":
        query += "#" + htag
    else:
        query += " OR #" + htag

if args.nort:
    query += "-filter:retweets"

#print 'query:', query

since_id = args.sinceid
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

if (len(tweet_docs) > 0):
    collection.insert_many(tweet_docs)
#print 'Found {0} new tweets'.format(len(tweet_docs))

print since_id
