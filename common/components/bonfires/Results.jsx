var React = require('react'),
    classNames = require('classnames'),
    { Grid, Row, Col } = require('react-bootstrap');

var Results = React.createClass({

  propTypes: {
    tests: React.PropTypes.array
  },

  _renderText: function(text, textClass) {
    return (
      <Col
        xs={ 11 }
        className={ classNames(textClass) }>
        { text }
      </Col>
    );
  },

  _renderTest: function(tests) {
    return tests.map(function(test, idx) {
      var err = test.err;
      var iconClass = {
        'ion-close-circled big-error-icon': err,
        'ion-checkmark-circled big-success-icon': !err
      };
      var textClass = {
        'test-output wrappable': true,
        'test-vertical-center': !err
      };
      return (
        <div key={ idx }>
          <Row>
            <Col
              xs={ 1 }
              className='text-center'>
              <i className={ classNames(iconClass) }></i>
            </Col>
            { this._renderText(test.text, textClass) }
            { err ? this._renderText(err, textClass) : null }
          </Row>
          <div className='ten-pixel-break'></div>
        </div>
      );
    }.bind(this));
  },

  render: function() {
    var tests = this.props.tests;
    if (!tests || tests.length && tests.length === 0) {
      return null;
    }
    return (
      <Grid>
        { this._renderTest(this.props.tests) }
      </Grid>
    );
  }
});

module.exports = Results;
