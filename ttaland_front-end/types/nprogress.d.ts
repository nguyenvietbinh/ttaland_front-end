// types/nprogress.d.ts
declare module 'nprogress' {
  interface NProgressOptions {
    minimum?: number
    template?: string
    easing?: string
    speed?: number
    trickle?: boolean
    trickleSpeed?: number
    showSpinner?: boolean
    parent?: string
    positionUsing?: string
    barSelector?: string
    spinnerSelector?: string
  }

  interface NProgress {
    configure(options: NProgressOptions): NProgress
    set(number: number): NProgress
    isStarted(): boolean
    start(): NProgress
    done(force?: boolean): NProgress
    inc(amount?: number): NProgress
    trickle(): NProgress
    status: number | null
    version: string
  }

  const nprogress: NProgress
  export default nprogress
}