casper.options.viewportSize = {
    width: 1280,
    height: 800
};

casper.test.begin('Sign up with invalid email', 2, function suite(test) {
    casper
        .start("https://ustream.tv/signup")
        .waitForSelector('.form-fluid', function () {
            test.assertExists('.form-fluid', 'Signup form exists');
            casper

                .sendKeys('#SignUpEmail', 'blasko.mihaly@ustream.tv')
                //this.click('#SignUpPassword');
                .sendKeys('#SignUpPassword', 'Test0123456')
                .waitWhileSelector('.loading', function () {
                    test.assertExists('.input-email.input-invalid', 'Email field indicates invalid email');
                });
        });

    casper.run(function () {
        test.done();
    });
});

casper.test.begin('Sign up with invalid password', 3, function suite(test) {
    casper
        .start("https://ustream.tv/signup")
        .waitForSelector('.form-fluid', function () {
            test.assertExists('.form-fluid', 'Signup form exists');
            casper
                .sendKeys('#SignUpEmail', 'blasko.mihaly+' + Date.now() + '@ustream.tv')
                .sendKeys('#SignUpPassword', '1')
                .waitWhileSelector('.loading', function () {
                    test.assertExists('.input-email.input-valid', 'Email field indicates valid email');
                    casper.click('#SignUpEmail');
                    test.assertExists('.userpassword.input-invalid', 'Password field indicates invalid password');
                });

        });

    casper.run(function () {
        test.done();
    });
});

casper.test.begin('Sign up without errors', 3, function suite(test) {

    casper
        .start("https://ustream.tv/signup")
        .waitForSelector('.form-fluid', function () {
            test.assertExists('.form-fluid', 'Signup form exists');
            //Fill login form
            casper.fill('form.form-fluid', {
                'signup[email]': 'blasko.mihaly+' + Date.now() + '@ustream.tv',
                'signup[password]': 'Test012345',
            }, true);
        });

    casper.waitForSelector('#EmailConfirmDialog', function () {
        test.assertExists('#EmailConfirmDialog', 'Email confirm dialog appears');
        casper.click('#EmailConfirmDialog .button');
    });

    casper.waitForSelector('.user-picture', function () {
        test.assertExists('.user-picture', 'User is logged in after successful signup');
        
    });

    casper.run(function () {
        test.done();
    });
});