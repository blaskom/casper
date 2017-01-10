casper.options.viewportSize = {
    width: 1280,
    height: 800
};

// user: blasko.mihaly+casper@ustream.tv
casper.test.begin('Tab change: QnA, SS, Twitter, Chat ', 7, function suite(test) {
    casper
        .start("http://www.ustream.tv/channel/S9YmU6zDDvm")
        .waitForSelector('.right-bar', function () {
            test.assertExists('[data-tab=qna]', 'QnA tab exists');
            test.assertExists('[data-socialstream-tab=socialStream]', 'SocialStream tab exists');
            test.assertExists('[data-socialstream-tab=twitterStream]', 'Twitter tab exists');
            // test.assertExists('[data-socialstream-tab=chat]', 'Chat tab exists');
        });
    casper.waitForSelector('.qna.tab-content', function () {
        test.assertVisible('.qna.tab-content', 'QnA is the default active widget');
        casper.click('[data-tab=socialStream] a');
        test.assertVisible('#SocialStream', 'SocialStream is active after tab change');
        casper.click('[data-socialstream-tab=twitterStream] a');
        test.assertVisible('.twitterStream', 'Twitter tab is active after tab change');
        casper.click('[data-tab=qna] a');
        test.assertVisible('.qna.tab-content', 'QnA tab is active after tab change');
    });

    casper.run(function () {
        test.done();
    });
});

// blasko.mihaly+casper_uuc@ustream.tv
casper.test.begin('Tab change: QnA, UUC chat ', 5, function suite(test) {
    casper
        .start("http://www.ustream.tv/channel/P6BfnqzrVCq")
        .waitForSelector('.right-bar', function () {
            test.assertExists('[data-tab=qna]', 'QnA tab exists');
            test.assertExists('[data-socialstream-tab=chat]', 'UUC Chat tab exists');
            test.assertVisible('.qna.tab-content', 'QnA is the default active widget');
            casper.click('[data-socialstream-tab=chat] a');
            test.assertVisible('[data-tab=chat]', 'Chat tab is active after tab change');
            casper.click('[data-tab=qna] a');
            test.assertVisible('.qna.tab-content', 'QnA tab is active after tab change');
        });
    casper.run(function () {
        test.done();
    });
});





