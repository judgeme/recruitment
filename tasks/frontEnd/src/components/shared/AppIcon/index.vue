<script lang="ts">
import { defineComponent, h } from 'vue';
import type { CSSProperties, SVGAttributes, PropType } from 'vue';

import IconsLibrary, { type IconTypes } from '@/lib/iconLibary';

interface IconBaseProps extends SVGAttributes {
  size?: number;
  color?: string;
  style?: CSSProperties;
  icon?: IconTypes;
  viewBox?: string;
}

export const IconBaseDefaults = {
  size: {
    type: Number as PropType<number>,
    default: 0
  },
  color: {
    type: String as PropType<string>,
    default: ''
  },
  style: {
    type: Object as PropType<CSSProperties>,
    default: () => ({})
  },
  icon: {
    type: String as PropType<IconTypes>,
    default: ''
  },
  viewBox: {
    type: String as PropType<string>,
    default: '0 0 512 512'
  },
  height: {
    type: String as PropType<string>,
    default: undefined
  },
  width: {
    type: String as PropType<string>,
    default: undefined
  }
};

const IconBase = ({ viewBox, style, size, color, icon, height, width }: IconBaseProps) => {
  return h(
    'svg',
    {
      style,
      viewBox,
      width: width ? width : `${size ? size + 'px' : '1em'}`,
      height: height ? height : `${size ? size + 'px' : '1em'}`,
      fill: color || 'currentColor',
      xmlns: 'http://www.w3.org/2000/svg',
      innerHTML: icon ? IconsLibrary[icon] : undefined
    },
    [h('title', icon?.toUpperCase())]
  );
};

IconBase.props = IconBaseDefaults;

export default defineComponent({
  name: 'AppIcon',
  inheritAttrs: false,
  components: {
    IconBase
  },
  props: {
    ...IconBaseDefaults
  }
});
</script>
<template>
  <icon-base
    :size="size"
    :color="color"
    :icon="icon"
    :viewBox="viewBox"
    :style="style"
    :width="width"
    :height="height"
  />
</template>
