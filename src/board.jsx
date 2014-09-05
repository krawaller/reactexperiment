/** @jsx React.DOM */

var Board = React.createClass({
  propTypes: {
    words: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onEndGame: React.PropTypes.func.isRequired
  },
  componentWillMount() {
    this.max = this.props.words.length/2;
  },
  getInitialState() {
    return {
      found: 0,
      message: 'choosetile',
      tilestates: Array(this.props.words.length+1).join("unturned ").trim().split(" ")
                //_.map(_.range(this.props.words.length),()=>'unturned')
    };
  },
  clickedTile(index){
    if (this.state.tilestates[index]==='unturned'){
      // turn up lone tile
      if (this.flippedtile === undefined) {
        this.flippedtile = index;
        this.setState({
          message: 'findmate',
          tilestates: _.extend(this.state.tilestates,_.object([index],['revealed']))
        });
      // clicked second tile
      } else {
        var otherindex = this.flippedtile,
            matched = this.props.words[index] === this.props.words[otherindex];
        delete this.flippedtile;
        // found mathing pair
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
    }
  },
  render() {
    return (
      <div>
        <button onClick={this.props.onEndGame}>End game</button>
        <Status found={this.state.found} max={this.max} message={this.state.message} />
        {this.props.words.map(
          (b,n) => <div onClick={_.partial(this.clickedTile,n)}><Tile word={b} status={this.state.tilestates[n]} /></div>
        )}
      </div>
    );
  }
});