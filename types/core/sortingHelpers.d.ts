// eslint-disable-next-line @typescript-eslint/no-extraneous-class
declare class SortingHelpers {
  /**
   * Given an ordered Array of siblings and a target position, return the
   * [min,max] indices to sort after the target
   * @internal
   */
  static _sortAfter<T> (siblings: T[], idx: number, sortKey: any): [T, T]

  /**
   * Given an ordered Array of siblings and a target position, return the
   * [min,max] indices to sort before the target
   * @internal
   */
  static _sortBefore<T> (siblings: T[], idx: number, sortKey: any): [T, T]

  /**
   * Given a source object to sort, a target to sort relative to, and an Array
   * of siblings in the container:
   * Determine the updated sort keys for the source object, or all siblings if a
   * reindex is required.
   * Return an Array of updates to perform, it is up to the caller to dispatch
   * these updates.
   * Each update is structured as:
   * ```javascript
   * {
   *   target: object,
   *   update: {sortKey: sortValue}
   * }
   * ```
   * @param source - source object being sorted
   * @param options - (default: `{}`)
   * @param target - The target object relative which to sort
   *                 (default: `null`)
   * @param siblings - The sorted Array of siblings which share the same sorted
   *                   container
   *                   (default: `[]`)
   * @param sortKey - The name of the data property within the source object
   *                  which defines the sort key
   *                  (default: `'sort'`)
   * @param sortBefore - Whether to sort before the target (if true) or after
   *                     (if false)
   *                     (default: `true`)
   * @typeParam T - the type of the source and target object
   * @returns An Array of updates for the caller of the helper function to
   *          perform
   */
  static performIntegerSort<T> (
    source: T,
    options: {
      siblings: object[]
      sortBefore?: boolean
      sortKey?: string
      target: any
    }
  ): Array<{
    target: T
    update: {
      sortKey: any
    }
  }>
}