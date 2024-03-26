import { Script } from "./block";

export const spiral = [["Repeat",10,[["Left",5,'Degrees'],["Repeat",10,[["Forward",10,'Steps'],["Left",14,'Degrees']]],["Repeat",10,[["Right",5,'Degrees'],["Repeat",17,[["Forward",13,'Steps'],["Left",3,'Degrees']]],["Back to Center"],["Right",3,'Degrees'],["Repeat",11,[["Pen Up"],["Forward",29,'Steps'],["Pen Down"],["Right",4,'Degrees'],["Forward",-24,'Steps']]]]]]]] as unknown as Script[];

export const circle = [["Repeat",10,[["Right",36,'Degrees'],["Forward",10,'Steps']]]] as unknown as Script[];

export const triangle = [["Repeat",3,[["Left",120,'Degrees'],["Forward",75,'Steps']]]] as unknown as Script[];
