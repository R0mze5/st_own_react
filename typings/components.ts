export type ComponentProps = {
  className?: string
  id?: string
  children?: Array<ComponentReturnType | string>
  [key : string]: any
}

export interface ComponentReturnType {
  type: string | Function,
  key?: string
  props?: ComponentProps
}

//

export type VirtualComponentReturnType = {
  type: string,
  key?: string
  props?: ComponentProps
} | string
