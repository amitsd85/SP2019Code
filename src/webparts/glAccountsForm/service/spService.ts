// import { sp } from "@pnp/sp";

// export class SPService {
//   public static async getActiveItems(listName: string): Promise<string[]> {
//     const items = await sp.web.lists.getByTitle(listName).items
//     .select("Id","Title").filter("IsActive eq 1")
      
//       .getAll();

//     return items.map(i => i.Title);
//   }

//   public static async getFormById(formId: string): Promise<any> {
//     const items = await sp.web.lists.getByTitle("SubmittedForms")
//       .items.filter(`FormID eq '${formId}'`).getAll();

//     return items[0];
//   }

//   public static async saveForm(data: any): Promise<void> {
//     await sp.web.lists.getByTitle("SubmittedForms").items.add(data);
//   }
// }
import { sp } from "@pnp/sp";

export class SPService {
  public static async getActiveItems(listName: string): Promise<string[]> {
    const items = await sp.web.lists.getByTitle(listName).items.select("Id", "Title").filter("IsActive eq 1").getAll();
    if (!items || items.length === 0) {
      return [];
    }

    return items.map(i => i.Title);
  }

  public static async getFormById(formId: string): Promise<any> {
    const items = await sp.web.lists.getByTitle("SubmittedForms").items.filter(`FormID eq '${formId}'`)
      .select("FormID", "Project", "Team", "Location", "ExtraField1", "ExtraField2", "ExtraField3").getAll();
      // .filter(`FormID eq '${formId}'`)
      // .getAll();

    return items.length > 0 ? items[0] : null;
  }

  public static async saveForm(data: any): Promise<void> {
    await sp.web.lists.getByTitle("SubmittedForms").items.add(data);
  }
}

