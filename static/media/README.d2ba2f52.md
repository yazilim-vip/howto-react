# howto-react
## Install
Install with yarn
```yarn
npm install --save @yazilim-vip/howto-react
```
Install with npm
```bash
npm install --save @yazilim-vip/howto-react
```

## Usage

```tsx
import  from 'react'

import { HowToContainer } from '@yazilim-vip/howto-react'

export const  Example = () => (
    <HowToContainer
        rootCategory={howToData}
        requestedPath={requestedPath}
        events={{
            itemSelectEventHandler: (type, link) => {
                // handle item select event 
            }
        }}
    />
)
```

### Examples
* [Showcase](https://howto-react.yazilim.vip/showcase)
* [Yazilim VIP HowTo Archive:](https://howto.yazilim.vip) 

## License

MIT © [Yazilim VIP](https://github.com/yazilim-vip/howto-react)
