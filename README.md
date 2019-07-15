# bug-jasmine-no-async-stacktrace

Demonstrates a missing stacktrace if an error is thrown in an asynchronous method during a Jasmine 3.4.0 test run.

How to reproduce it:

    git clone https://github.com/prantlf/bug-jasmine-no-async-stacktrace
    cd bug-jasmine-no-async-stacktrace
    npm ci
    npm test

An excerpt of the test output:

    HeadlessChrome 75.0.3770 (Mac OS X 10.14.5) answerEverything answers understandably FAILED
    	Uncaught Error: Crashing... thrown
    HeadlessChrome 75.0.3770 (Mac OS X 10.14.5): Executed 1 of 2 (1 FAILED) (0 secsHeadlessChrome 75.0.3770 (Mac OS X 10.14.5) answerEverything answers FAILED
    	Error: Crashing...
    	    at crash (test/index.test.js:2:9)
    	    at UserContext.<anonymous> (test/index.test.js:14:5)
    	    at <Jasmine>
    HeadlessChrome 75.0.3770 (Mac OS X 10.14.5): Executed 2 of 2 (2 FAILED) (0 secsHeadlessChrome 75.0.3770 (Mac OS X 10.14.5): Executed 2 of 2 (2 FAILED) ERROR (0.003 secs / 0.003 secs)

The error thrown from the [asynchronous test] lacks the stacktrace:

    	Uncaught Error: Crashing... thrown

The error thrown from the [synchronous test] includes the stacktrace:

    	Error: Crashing...
    	    at crash (test/index.test.js:2:9)
    	    at UserContext.<anonymous> (test/index.test.js:14:5)
    	    at <Jasmine>

Let us apply the [suggested fix] and run the tests again:

    patch -p0 < fix.diff
    npm test

The test output gets longer:

    HeadlessChrome 75.0.3770 (Mac OS X 10.14.5) answerEverything answers understandably FAILED
    	Error: Crashing...
    	    at crash (test/index.test.js:2:9)
    	    at UserContext.<anonymous> (test/index.test.js:20:7)
    	Failed: Crashing...
    	Error: Crashing...
    	    at crash (test/index.test.js:2:9)
    	    at UserContext.<anonymous> (test/index.test.js:20:7)
    HeadlessChrome 75.0.3770 (Mac OS X 10.14.5): Executed 1 of 2 (1 FAILED) (0 secsHeadlessChrome 75.0.3770 (Mac OS X 10.14.5) answerEverything answers FAILED
    	Error: Crashing...
    	    at crash (test/index.test.js:2:9)
    	    at UserContext.<anonymous> (test/index.test.js:14:5)
    	    at <Jasmine>
    HeadlessChrome 75.0.3770 (Mac OS X 10.14.5): Executed 2 of 2 (2 FAILED) (0 secsHeadlessChrome 75.0.3770 (Mac OS X 10.14.5): Executed 2 of 2 (2 FAILED) ERROR (0.003 secs / 0.003 secs)

The error thrown from the asynchronous test includes the stacktrace now:

    	Error: Crashing...
    	    at crash (test/index.test.js:2:9)
    	    at UserContext.<anonymous> (test/index.test.js:20:7)
    	Failed: Crashing...
    	Error: Crashing...
    	    at crash (test/index.test.js:2:9)
    	    at UserContext.<anonymous> (test/index.test.js:20:7)

The duplicate logging starting with "Failed:" is caused by the console output of the progress reporter. Reporters obtain the error with its stacktrace correctly just once.

[synchronous test]: https://github.com/prantlf/bug-jasmine-no-async-stacktrace/blob/master/test/index.test.js#L12
[asynchronous test]: https://github.com/prantlf/bug-jasmine-no-async-stacktrace/blob/master/test/index.test.js#L17
[suggested fix]: https://github.com/prantlf/bug-jasmine-no-async-stacktrace/blob/master/fix.diff
