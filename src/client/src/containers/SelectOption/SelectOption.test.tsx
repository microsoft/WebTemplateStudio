import * as React from "react";
import { shallow } from "enzyme";
import { SelectOption } from "./index";
import { ISelected } from "../../types/selected";

describe("SelectOption", () => {
  let masterAnyFrameworkBlank="",
  masterAnyFrameworkGrid="",
  masterAnyFrameworkList="",
  masterAnyFrameworkMaster="";

  describe("any framework", () => {
    let props: any;
    let wrapper: any;
    let instance: any;
    masterAnyFrameworkBlank="anyFramework.Blank";
    masterAnyFrameworkGrid="anyFramework.Grid";
    masterAnyFrameworkList="anyFramework.List";
    masterAnyFrameworkMaster="anyFramework.MasterDetail";


    let loadBaseMockComp = ()=>{
      props = {
        setDetailPage:()=>{},
        title:"oooo",
        description:"sdfsdfsdf",
        selectedCardIndices: [],
        cardTypeCount:{},
        currentCardData: [],
        options:[
          {
            author: "Microsoft",
            body: "A blank page for you to build your web application from scratch.",
            defaultName: "Blank",
            internalName: masterAnyFrameworkBlank,
            isValidTitle: true,
            licenses: [{}],
            longDescription: "This is the most basic page. A blank canvas to mold into whatever you wish. The blank page leaves pretty much everything up to you.",
            selected: false,
            svgUrl: undefined,
            title: "Blank"
          },
          {
            author: "Microsoft",
            body: "Simple image and text components which are organized into a grid.",
            defaultName: "Grid",
            internalName: masterAnyFrameworkGrid,
            isValidTitle: true,
            licenses: [{}],
            longDescription: "A page displaying simple image and text components which are organized into a grid. Grid pages are a system for creating order among elements in a website.",
            selected: false,
            svgUrl: undefined,
            title: "Grid"
          },
          {
            author: "Microsoft",
            body: "Add and remove text from an adaptive list.",
            defaultName: "List",
            internalName: masterAnyFrameworkList,
            isValidTitle: true,
            licenses: [{}],
            longDescription: "The list page allows you to add custom text in the form of an adaptive list. This pattern is frequently used for blog pages and messaging apps. If a database is selected from the Azure Cloud Services the list page will automatically connect to the deployed Azure database.",
            selected: false,
            svgUrl: undefined,
            title: "List"
          },
          {
            author: "Microsoft",
            body: "A master pane and a details pane for content.",
            defaultName: "Master Detail",
            internalName: masterAnyFrameworkMaster,
            isValidTitle: true,
            licenses: [{}],
            longDescription: "The master-detail page has a master pane and a details pane for content. When an item in the master list is selected, the details pane is updated. This pattern is frequently used for email and address books.",
            selected: false,
            svgUrl: undefined,
            title: "Master Detail"
          }
        ],
        multiSelect:true,
        isFrameworkSelection:false,
        isPagesSelection:false,
        handleCountUpdate:(cardTypeCount:Object)=>{
          props.cardTypeCount = cardTypeCount;
        },
        isAddPagesModalOpen:false,
        selectOptions:(listCurrentCardData: ISelected[] )=>{
          props.currentCardData = listCurrentCardData;
        },
        intl:{formatMessage:()=>{} },
      };
    }

    let warpperComp = ()=>{
      wrapper = shallow(<SelectOption {...props} />);
      instance = wrapper.instance();
    }

    it("renders without crashing", () => {
      loadBaseMockComp();
      warpperComp();
      expect(wrapper).toBeDefined();
    });

    it("on first moment should have 1 page blank", () => {
      expect(props.currentCardData.length).toBe(1);
      expect(props.cardTypeCount[masterAnyFrameworkBlank]).toBe(1);
    });

    it("add 1 page blank", () => {
      instance.addPage(0);
      expect(props.cardTypeCount[masterAnyFrameworkBlank]).toBe(2);
    });

    it("add 1 page blank", () => {
      instance.addPage(0);
      expect(props.cardTypeCount[masterAnyFrameworkBlank]).toBe(3);
    });

    it("remove 1 page blank", () => {
      instance.removePage(0);
      expect(props.cardTypeCount[masterAnyFrameworkBlank]).toBe(2);
    });

    it("add 1 grid page", () => {
      instance.addPage(1);
      expect(props.cardTypeCount[masterAnyFrameworkGrid]).toBe(1);
    });

    it("add 1 grid page", () => {
      instance.addPage(1);
      expect(props.cardTypeCount[masterAnyFrameworkGrid]).toBe(2);
    });

    it("add 1 list page", () => {
      instance.addPage(2);
      expect(props.cardTypeCount[masterAnyFrameworkList]).toBe(1);
    });

    it("add 1 master page", () => {
      instance.addPage(3);
      expect(props.cardTypeCount[masterAnyFrameworkMaster]).toBe(1);
    });

    it("remove 1 list page", () => {
      instance.removePage(2);
      expect(props.cardTypeCount[masterAnyFrameworkList]).toBe(0);
    });

    it("remove 1 master page", () => {
      instance.removePage(3);
      expect(props.cardTypeCount[masterAnyFrameworkMaster]).toBe(0);
    });

  });
});
