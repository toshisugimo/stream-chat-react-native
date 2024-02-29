import React from 'react';

import { IconProps, RootPath, RootSvg } from './utils/base';

export const Sound = (props: IconProps) => (
  <RootSvg {...props}>
    <RootPath
      d='M10.667 8.813l-2.265 1.854H6v2.666h2.402l2.265 1.854V8.813zm-2.741 5.854H5.333A.667.667 0 014.667 14v-4a.667.667 0 01.666-.667h2.593l3.53-2.888a.333.333 0 01.544.258v10.594a.334.334 0 01-.545.258l-3.528-2.888h-.001zm9.011 2.756l-.944-.944A5.987 5.987 0 0018 12a5.988 5.988 0 00-2.203-4.645l.947-.947A7.317 7.317 0 0119.334 12a7.315 7.315 0 01-2.397 5.423zm-2.362-2.362l-.948-.948A2.663 2.663 0 0014.667 12c0-.953-.5-1.79-1.254-2.261l.96-.96A3.994 3.994 0 0116 12a3.991 3.991 0 01-1.425 3.06z'
      {...props}
    />
  </RootSvg>
);
