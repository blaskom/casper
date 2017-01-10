casper.options.viewportSize = {
    width: 1280,
    height: 800
};

// user: blasko.mihaly+casper@ustream.tv
casper.test.begin('Follow tests', 6, function suite(test) {
    var followersOriginal;
    var followersFollowed;
    var followersUnfollowed;
    casper
        .start("http://www.ustream.tv/channel/P6BfnqzrVCq")
        .waitForSelector('.follow', function () {
            test.assertExists('.follow', 'Follow button appears when user is not logged in');
            followersOriginal = parseInt(casper.fetchText('.followers-number'));
            casper.click('.follow');
        })
        .waitForSelector('#ui-dialog-title-LoginDialog', function () {
            test.assertExists('#ui-dialog-title-LoginDialog', 'Login overlay appears');
            casper.fill('form#LoginClassicForm', {
                'username': 'blasko.mihaly+casper@ustream.tv',
                'password': 'Almaalma1',
            }, true);
        })
        .waitForSelector('.unfollow', function () {
            test.assertExists('.unfollow', 'Unfollow button appears if the channel is followed');
            followersFollowed = parseInt(casper.fetchText('.followers-number'));
            test.assert(followersFollowed > followersOriginal, 'Follower number increased ' + followersOriginal + ' » ' + followersFollowed);
            casper.click('.unfollow');
        })
        .waitForSelector('.follow', function () {
            test.assertExists('.follow', 'Follow button appears if the channel is unfollowed');
            followersUnfollowed = parseInt(casper.fetchText('.followers-number'));
            test.assert(followersFollowed > followersUnfollowed, 'Follower number decreased ' + followersFollowed + ' » ' + followersUnfollowed);

        });
    
        // Follow after page reload

/*
        .waitForSelector('.follow', function () {
            casper.click('.follow');
            casper.reload(function () {
                    casper.echo("Page reloaded");
                });
        })
        .wait(5000  , function () {
            casper.capture('follow.png');
        })
            
        .waitForSelector('.unfollow', function () {
            
            test.assertExists('.unfollow', 'Unfollow button appears after page reload');
            followersFollowed = parseInt(casper.fetchText('.followers-number'));
            test.assert(followersFollowed > followersOriginal, 'Follower number increased ' + followersFollowed + ' » ' + followersUnfollowed);
        });
*/
    casper.run(function () {
        test.done();
    });
});
