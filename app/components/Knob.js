import React from 'react';
import { render } from 'react-dom';
import Knob from 'jim-knopf';
import Ui from 'jim-knopf-ui';
import 'jim-knopf-ui-el';

/**
 * A knob UI component
 */
export default class KnobUI extends React.Component
{
  componentDidMount()
  {
    var ScaleExample = function() {};

    ScaleExample.prototype = Object.create(Ui.prototype);

    ScaleExample.prototype.createElement = function() {

      Ui.prototype.createElement.apply(this, arguments);

      this.addComponent(new Ui.Arc({
        arcWidth: this.width / 10
      }));

      this.addComponent(new Ui.Pointer(this.merge(this.options, {
        type: 'Rect',
        pointerWidth: this.width / 10
      })));

      this.merge(this.options, {arcWidth: this.width / 10});
      var arc = new Ui.El.Arc(this.options);
      arc.setAngle(this.options.anglerange);
    }

    let knob = new Knob(document.getElementsByClassName('knob-ui')[0], new ScaleExample());

    knob.input.addEventListener('change', (e) => {
      this.props.onInput(e.target.value);
    });
  }

  render()
  {
    const { props } = this;

    return (
      <div className='audio-control knob'>
        <label className='audio-control-label'>{props.label}</label>
        <input className='knob-ui' type='range' min='50' max='1200' step='5' data-width='50' data-height='50' data-angleoffset='220' data-anglerange='280' />
      </div>
    )
  }
}
