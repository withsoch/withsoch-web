// types/wistia.d.ts
//
// Wistia's player is a web component (<wistia-player>), loaded via their
// player.js custom-elements bundle. Not a standard intrinsic, so JSX needs
// this declared or every usage is a type error.

import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "wistia-player": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          "media-id": string;
          aspect?: string | number;
        },
        HTMLElement
      >;
    }
  }
}
