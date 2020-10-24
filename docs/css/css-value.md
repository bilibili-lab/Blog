

# 值

## 初始值

- `initial value` [初始值](https://developer.mozilla.org/zh-CN/docs/Web/CSS/initial_value)。

-  初始值是指默认值。

-  初始值的使用取决于属性是否被继承。

    - 对于[继承属性](https://developer.mozilla.org/en-US/docs/Web/CSS/inheritance#Inherited_properties)，初始值只能被用于没有指定值的根元素上。

    - 对于[非继承属性](https://developer.mozilla.org/en-US/docs/Web/CSS/inheritance#Non-inherited_properties)，初始值可以被用于任意没有指定值的元素上。

## 指定值

- `specified value` [指定值](https://developer.mozilla.org/zh-CN/docs/Web/CSS/specified_value)。

- 通过直接声明或 CSS 属性的值。


## 计算值

- `computed value`[计算值](https://developer.mozilla.org/zh-CN/docs/Web/CSS/computed_value)。

- 通过需要计算得到的值，如，继承和相对的尺寸。（注意：有些计算要等到布局确定才能进行，比如`width:100%;`）

-  计算值所需要的计算通常包括将相对值转换成绝对值(如 `em` 单位或百分比)。例如，如一个元素的属性值为 `font-size:16px` 和 `padding-top:2em`, 则 `padding-top` 的计算值为 `32px` (字体大小的`2`倍)。

- 有些属性(这些元素的百分比与需要布局确定后才能知道的值有关，如 `width`, `margin-right`, `text-indent`, 和 `top`)，它们的“百分比值”会转换成“百分比的计算值”。

## 应用值

- `used value`[应用值](https://developer.mozilla.org/zh-CN/docs/Web/CSS/used_value)

- 完成所有计算后最终使用的值，可以由`window.getComputedStyle` 获取。

## 实际值

-  `actual value`[实际值](https://developer.mozilla.org/zh-CN/docs/Web/CSS/actual_value)

- 实际值是应用值被应用后的近似值。如，一个用户代理可能只能渲染一个整数像素值的边框（实际值），并且该值可能被强制近似于边框的计算宽度值。