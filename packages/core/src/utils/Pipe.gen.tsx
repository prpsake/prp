/* TypeScript file generated from Pipe.res by genType. */
/* eslint-disable import/first */


// @ts-ignore: Implicit any on import
import * as PipeBS__Es6Import from './Pipe.mjs';
const PipeBS: any = PipeBS__Es6Import;

// tslint:disable-next-line:interface-over-type-literal
export type t<a,b> = (_1:a) => b;

export const pipe: <a,b,c>(_1:t<a,b>, _2:t<b,c>) => t<a,c> = PipeBS.pipe;

export const pipe3: <a,b,c,d>(_1:t<a,b>, _2:t<b,c>, _3:t<c,d>) => t<a,d> = PipeBS.pipe3;

export const pipe4: <a,b,c,d,e>(_1:t<a,b>, _2:t<b,c>, _3:t<c,d>, _4:t<d,e>) => t<a,e> = PipeBS.pipe4;
