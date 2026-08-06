import React from 'react';
import { createRoot } from 'react-dom/client';
import { PluginConnectDialog } from './components/PluginConnectDialog';
import { Slider } from './components/ui/slider';
import './index.css';

// 1. Mount PluginConnectDialog if container is present
const pluginDialogContainer = document.getElementById('plugin-dialog-root');
if (pluginDialogContainer) {
  const root = createRoot(pluginDialogContainer);
  root.render(React.createElement(PluginConnectDialog));
}

// 2. Mount Temperature Slider if container is present
const tempSliderContainer = document.getElementById('caTemperatureSliderRoot');
if (tempSliderContainer) {
  const root = createRoot(tempSliderContainer);
  function TemperatureSlider() {
    const [value, setValue] = React.useState([0.7]);
    return React.createElement(
      'div',
      { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
      React.createElement(
        React.Fragment,
        null,
        React.createElement(Slider, {
          value: value,
          min: 0,
          max: 1,
          step: 0.05,
          onValueChange: (v) => {
            setValue(v);
            const input = document.getElementById('caTemperatureInput');
            if (input) input.value = v[0];
          }
        })
      ),
      React.createElement(
        'div',
        {
          style: {
            minWidth: '40px',
            textAlign: 'right',
            fontSize: '13px',
            fontWeight: '600',
            color: '#111827'
          }
        },
        value[0].toFixed(1)
      )
    );
  }
  root.render(React.createElement(TemperatureSlider));
}
