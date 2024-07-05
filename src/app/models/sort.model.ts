export enum SortOptionApiName {
  SoonerFirst = 'priorityAsc',
  SoonerLast = 'priorityDesc',
  NewerFirst = 'dateNewerFirst',
  NewerLast = 'dateOlderFirst',
}

export enum SortOptionDisplayName {
  SoonerFirst = 'Priority: Sooner first',
  SoonerLast = 'Priority: Sooner last',
  NewerFirst = 'Date: Newer first',
  NewerLast = 'Date: Older first',
}

export class Sort {
  apiName: SortOptionApiName;
  displayName: SortOptionDisplayName;

  static readonly sortOptions = Object.keys(SortOptionApiName).map((propKey) => {
    return new Sort(SortOptionApiName[propKey], SortOptionDisplayName[propKey]);
  });

  private constructor(apiName: SortOptionApiName, displayName: SortOptionDisplayName) {
    this.apiName = apiName;
    this.displayName = displayName;
  }
}
