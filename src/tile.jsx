/** @jsx React.DOM */

var Tile = React.createClass({
  propTypes: {
    status: React.PropTypes.string.isRequired, 
    word: React.PropTypes.string.isRequired
  },
  render(){
    return (
      <div className={'brick '+this.props.status}>
        <div className='front'>?</div>
        <div className='back'>{this.props.word}</div>
      </div>
    );
  }
});