/**
 *
 * RSVP Controller.
 *
 * - isShown()
 * - isPaused()
 * - start()
 * - next()
 * - pause()
 * - resume()
 * - dismiss()
 * - updateUserPreferences(userPreferences)
 */
function ReadlineRSVPController (context) {

    var self = this;

    self.context = context;

    self.pauseFlag = false;
    self.rsvpView = null;
    self.rsvpModel = null;

    self.start = function(text) {

        if (self.isShown()) {
            return; // TODO why is start called twice?
        }

        self.rsvpView = new ReadlineRSVPView(self.context);
        self.rsvpModel = new ReadlineRSVPModel(self.context, text);

        // Do Start Animation & Start
        self.rsvpView.startAnimation(function() {
            self.next();
        });
    }

    self.next = function() {

        if (!self.isShown()) {
            self.dismiss();
            return;
        }

        // Hit the End
        if (self.rsvpModel.stepForward() === false) {
            self.dismiss();
            return;
        }

        self.updateView();

        if (self.isPaused()) return;

        var chunk = self.rsvpModel.currentChunk();
        var chunkDurationMultiplier = chunk.DurationMultiplier;

        var pauseMS = configWordPauseMS = parseInt(60000 / parseInt(self.context.UserPreferences.RSVP_WPM_NUM));
            pauseMS = pauseMS * chunkDurationMultiplier;

        // Schedule Next Run
        setTimeout(function() {
            self.next();
        }, pauseMS);
    }

    self.isShown = function() {
        if (self.rsvpView) {
            return self.rsvpView.isShown();
        } else {
            return false;
        }
    }

    self.isPaused = function() {
        return self.pauseFlag;
    }

    self.pause = function() {
        self.pauseFlag = true;
    }

    self.resume = function() {
        self.pauseFlag = false;
        self.next();
    }

    self.stepForward = function() {

        if (!self.isShown()) {
            //self.dismiss();
            return;
        }

        self.pauseFlag = true;
        self.rsvpModel.stepForward();

        self.updateView();
    }

    self.stepBackword = function() {

        if (!self.isShown()) return;

        self.pauseFlag = true;
        self.rsvpModel.stepBackword();

        self.updateView();
    }

    self.dismiss = function() {

        if (!self.isShown()) return;

        self.rsvpView.dismiss();

        self.rsvpModel = null;
        self.rsvpView = null;
        self.pauseFlag = false;
    }

    self.updateView = function() {

        var chunk = self.rsvpModel.currentChunk();
        var chunkText = chunk.Text;
        var chunkFocalPointIndex = chunk.FocalPointIndex;

        //console.log("Text: " + chunkText);

        self.rsvpView.setString(chunkText, chunkFocalPointIndex);
        self.rsvpView.setProgress(self.rsvpModel.percentProgress());
        self.rsvpView.setTotalDuration(self.rsvpModel.estimatedTotalDurationMultiplier());
    }

    self.updateUserPreferences = function(userPreferences) {

        self.context.UserPreferences = userPreferences;

        if (self.rsvpView) {
            self.rsvpView.updateUserPreferences(self.context.UserPreferences);
        }
    }
}
