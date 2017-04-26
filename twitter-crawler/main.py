#!/usr/bin/env python
# -*- coding: utf-8 -*-

from twython import Twython
import argparse
import os


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


# Creating query from command-line args
query = ""
for htag in args.htags:
    if query == "":
        query += "#" + htag
    else:
        query += "+#" + htag

if args.nort:
    query += "-filter:retweets"


# Searching
search = t.search(q=query, count=args.count)

tweets = search['statuses']


# Printing results
for tweet in tweets:
  print tweet['id_str'], '\n', tweet['text'].encode('utf-8'), '\n\n\n'