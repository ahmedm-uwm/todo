export function configure(config) {
  //config.globalResources([]);
  config.globalResources([
    './value-converters/hide-completed',
    './value-converters/date-format',
    './value-converters/done'
  ]);
}
