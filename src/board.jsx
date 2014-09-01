/** @jsx React.DOM */

var Board = React.createClass({
  propTypes: {
    words: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    endGame: React.PropTypes.func.isRequired
  },
  componentWillMount() {
    this.max = this.props.words.length/2;
  },
  getInitialState() {
    return {
      found: 0,
      message: 'choosetile',
      tilestates: _.map(_.range(this.props.words.length),()=>'unturned')
    };
  },
  clickedTile(index){
    // turn up lone tile 
    if (this.flippedtile === undefined) {
      this.flippedtile = index;
      this.setState({
        message: 'findmate',
        tilestates: _.extend(this.state.tilestates,_.object([index],['revealed']))
      });
    // clicked second
    } else {
      var otherindex = this.flippedtile, matched = this.props.words[index] === this.props.words[otherindex];
      delete this.flippedtile;
      // found mathinc pair
      if (matched) {
        this.setState({
          found: this.state.found+1,
          message: 'foundmate',
          tilestates: _.extend(this.state.tilestates,_.object([index,otherindex],['correct','correct']))
        });
      // pair didn't match
      } else {
        this.setState({
          message: 'wrong',
          tilestates: _.extend(this.state.tilestates,_.object([index,otherindex],['wrong','wrong']))
        });
      }
      // restore UI message after 1500, and flip back eventual failed attempt
      setTimeout(()=>{
        if (this.isMounted()) {
          this.setState({
            message: this.state.message === 'findmate' ? 'findmate' : this.max === this.state.found ? 'foundall' : 'choosetile',
            tilestates: matched ? this.state.tilestates : _.extend(this.state.tilestates,_.object([index,otherindex],['unturned','unturned']))
          });
        }
      },1500);
    }
  },
  render() {
    return (
      <div>
        <button onClick={this.props.endGame}>End game</button>
        <Status found={this.state.found} max={this.max} message={this.state.message} />
        {this.props.words.map(
          (b,n) => <Tile word={b} key={n} clickedTile={this.clickedTile} status={this.state.tilestates[n]} />
        )}
      </div>
    );
  }
});