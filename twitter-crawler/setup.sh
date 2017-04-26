python -c "import twython"

if [ $? -eq 1 ]; then
    echo "Installing module twython via pip..."
    sudo pip install twython
fi

echo "Exporting twitter keys..."

if [[ $TWITTER_API_KEY == "" ]]; then
    echo -n "Enter your twitter api key and press [ENTER]: "
    read twitter_api_key
    echo 'export TWITTER_API_KEY="'${twitter_api_key}'"' >> ~/.bashrc
    echo "TWITTER_API_KEY set successfully"
else
    echo "TWITTER_API_KEY already set."
fi

if [[ $TWITTER_API_KEY_SECRET == "" ]]; then
    echo -n "Enter your twitter api secret key and press [ENTER]: "
    read twitter_api_key_secret
    echo 'export TWITTER_API_KEY_SECRET="'${twitter_api_key_secret}'"' >> ~/.bashrc
    echo "TWITTER_API_KEY_SECRET set successfully"
else
    echo "TWITTER_API_KEY_SECRET already set."
fi

if [[ $TWITTER_ACCESS_TOKEN == "" ]]; then
    echo -n "Enter your twitter access token and press [ENTER]: "
    read twitter_access_token
    echo 'export TWITTER_ACCESS_TOKEN="'${twitter_access_token}'"' >> ~/.bashrc
    echo "TWITTER_ACCESS_TOKEN set successfully"
else
    echo "TWITTER_ACCESS_TOKEN already set."
fi

if [[ $TWITTER_ACCESS_TOKEN_SECRET == "" ]]; then
    echo -n "Enter your twitter access token secret and press [ENTER]: "
    read twitter_access_token_secret
    echo 'export TWITTER_ACCESS_TOKEN_SECRET="'${twitter_access_token_secret}'"' >> ~/.bashrc
    echo "TWITTER_ACCESS_TOKEN_SECRET set successfully"
else
    echo "TWITTER_ACCESS_TOKEN_SECRET already set."
fi

echo "Setup completed!"
exec bash