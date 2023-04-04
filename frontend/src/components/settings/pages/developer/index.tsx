import { DialogBody, Field, TextField, Toggle } from 'decky-frontend-lib';
import { useRef } from 'react';
import { FaReact, FaSteamSymbol } from 'react-icons/fa';

import { setShouldConnectToReactDevTools, setShowValveInternal } from '../../../../developer';
import { useSetting } from '../../../../utils/hooks/useSetting';
import RemoteDebuggingSettings from '../general/RemoteDebugging';

export default function DeveloperSettings() {
  const [enableValveInternal, setEnableValveInternal] = useSetting<boolean>('developer.valve_internal', false);
  const [reactDevtoolsEnabled, setReactDevtoolsEnabled] = useSetting<boolean>('developer.rdt.enabled', false);
  const [reactDevtoolsIP, setReactDevtoolsIP] = useSetting<string>('developer.rdt.ip', '');
  const textRef = useRef<HTMLDivElement>(null);

  return (
    <DialogBody>
      <RemoteDebuggingSettings />
      <Field
        label="Enable Valve Internal"
        description={
          <span style={{ whiteSpace: 'pre-line' }}>
            Enables the Valve internal developer menu.{' '}
            <span style={{ color: 'red' }}>Do not touch anything in this menu unless you know what it does.</span>
          </span>
        }
        icon={<FaSteamSymbol style={{ display: 'block' }} />}
      >
        <Toggle
          value={enableValveInternal}
          onChange={(toggleValue) => {
            setEnableValveInternal(toggleValue);
            setShowValveInternal(toggleValue);
          }}
        />
      </Field>
      <Field
        label="Enable React DevTools"
        description={
          <>
            <span style={{ whiteSpace: 'pre-line' }}>
              Enables connection to a computer running React DevTools. Changing this setting will reload Steam. Set the
              IP address before enabling.
            </span>
            <br />
            <br />
            <div ref={textRef}>
              <TextField label={'IP'} value={reactDevtoolsIP} onChange={(e) => setReactDevtoolsIP(e?.target.value)} />
            </div>
          </>
        }
        icon={<FaReact style={{ display: 'block' }} />}
      >
        <Toggle
          value={reactDevtoolsEnabled}
          // disabled={reactDevtoolsIP == ''}
          onChange={(toggleValue) => {
            setReactDevtoolsEnabled(toggleValue);
            setShouldConnectToReactDevTools(toggleValue);
          }}
        />
      </Field>
    </DialogBody>
  );
}
