export type TemplatorCompiler = (data: Record<string, any>) => string;

export type TemplatorProps = {
  compiler: TemplatorCompiler,
  data?: {
    [key: string]: any,
  }
};
