export interface ObjetoFirebase {
  name?: string;
  category?: category;
  characteristics?: string;
  consider?: boolean;
}

enum category {
  importante = 2,
  normal = 1,
  secundario = 0
}
