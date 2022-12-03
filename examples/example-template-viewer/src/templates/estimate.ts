import {type Model, type View, html} from "@prpsake/template-viewer";
import InvoiceBase from "../models/InvoiceBase";

export const model: Model<InvoiceBase> = InvoiceBase;

export const view: View<InvoiceBase> = ({data}) => html`
  <!-- repeated content : start -->
  <footer class="bottom-left -mt-[1.5mm] font-mono text-template-fg">
    <div class="flex text-2xs">
      <div class="flex-none w-page-left">
        <p class="font-extralight">
          Alle Preise in Schweizer Franken und unverbindlich.
        </p>
        <p class="font-extralight">Nicht MWST-pflichtig.</p>
        <br />
        <dl>
          <div class="flex">
            <dt class="font-medium italic">IBAN</dt>
            &nbsp;
            <dd class="font-extralight">${data.creditor.iban}</dd>
          </div>
          ${data.creditor.uid &&
          html`
            <div class="flex">
              <dt class="font-medium italic">UID</dt>
              &nbsp;
              <dd class="font-extralight">${data.creditor.uid}</dd>
            </div>
          `}
        </dl>
      </div>
      <div class="flex-auto">
        <p class="font-medium italic">${data.creditor.name}</p>
        <p class="font-extralight">
          ${data.creditor.street} ${data.creditor.houseNumber}
        </p>
        <p class="font-extralight">
          ${data.creditor.postCode} ${data.creditor.locality}
        </p>
        <br />
        <dl>
          <div class="flex">
            <dt class="font-medium italic">e-mail</dt>
            &nbsp;
            <dd class="font-extralight">
              <a
                href="mailto:${data.creditor
                  .email}?subject=${data.emailSubject}">
                ${data.creditor.email}
              </a>
            </dd>
          </div>
          ${data.creditor.threema &&
          html`
            <div class="flex">
              <dt class="font-medium italic">threema</dt>
              &nbsp;
              <dd class="font-extralight">${data.creditor.threema}</dd>
            </div>
          `}
        </dl>
      </div>
    </div>
  </footer>
  <!-- end : repeated content -->

  <header class="flex font-mono text-template-fg">
    <div class="flex-none w-page-left"></div>
    <div class="flex-auto pt-20 pb-28 font-extralight text-sm">
      <p>${data.debtor.organisation}</p>
      <p>${data.debtor.person}</p>
      <p>${data.debtor.street} ${data.debtor.houseNumber}</p>
      <p>${data.debtor.postCode} ${data.debtor.locality}</p>
    </div>
  </header>
  <main class="flex font-mono text-template-fg">
    <section class="flex-auto order-2">
      <h1 class="font-extrabold text-3xl pt-[0.3rem] pb-[1.5rem]">
        Kostenschätzung
      </h1>
      <dl class="table text-sm">
        <div class="table-row">
          <dt class="table-cell pr-8 pb-4 font-medium italic">Nummer</dt>
          <dd class="table-cell pb-4 font-extralight">${data.number}</dd>
        </div>
        <div class="table-row">
          <dt class="table-cell pr-8 pb-4 font-medium italic">Betreffend</dt>
          <dd class="table-cell pb-4 font-extralight">${data.subject}</dd>
        </div>
        <div class="table-row">
          <dt class="table-cell pr-8 pb-4 font-medium italic">Datum</dt>
          <dd class="table-cell pb-4 font-extralight">${data.date}</dd>
        </div>
        <div class="table-row">
          <dt class="table-cell pr-8 pb-4 font-medium italic">Gültig bis</dt>
          <dd class="table-cell pb-4 font-extralight">${data.due}</dd>
        </div>
        <div class="table-row">
          <dt class="table-cell pr-8 pb-4 font-medium italic">Betrag</dt>
          <dd class="table-cell pb-4 font-extralight">
            ${data.currency} ${data.amount}
          </dd>
        </div>
      </dl>
    </section>
    <section
      class="flex-none w-page-left pt-[1.55rem] pr-[20mm] order-1 text-3xs">
      <header class="flex justify-between pb-8 font-medium italic">
        <h2 class="w-1/3">Posten</h2>
        <span class="w-1/6 text-center pl-2">Menge</span>
        <span class="w-1/6 text-center pl-3">Einheit</span>
        <span class="w-1/6 text-right pr-1">Preis</span>
        <span class="w-1/6 text-right">Betrag</span>
      </header>
      <ul>
        ${data.items.map(
          (item, i) => html`
            <li class="relative pb-8 break-inside-avoid">
              <div
                class="absolute w-[6px] h-[6px] bg-template-fg top-[2px] -left-[10mm]"></div>
              <div
                class=${{
                  flex: true,
                  "justify-between": true,
                  "pb-2": item.description || item.title,
                }}>
                <span class="w-1/3 font-medium italic">${i + 1}</span>
                <span class="w-1/6 text-center pl-2 font-extralight"
                  >${item.quantity}</span
                >
                <span class="w-1/6 text-center pl-3 font-extralight"
                  >${item.unit}</span
                >
                <span class="w-1/6 text-right pr-1 font-extralight"
                  >${item.price}</span
                >
                <span class="w-1/6 text-right font-extralight"
                  >${item.total}</span
                >
              </div>
              <h3 class="w-5/6 font-medium italic">${item.title}</h3>
              <p class="w-5/6 font-extralight">${item.description}</p>
              ${Boolean(item.issues?.length) &&
              html`
                <p class="w-full pt-2">
                  <span class="font-medium italic">Issues</span>&nbsp;
                  <span class="font-extralight">${item.issues.join(", ")}</span>
                </p>
              `}
            </li>
          `,
        )}
      </ul>
      <footer class="relative flex justify-between">
        <div
          class="absolute w-[6px] h-[6px] bg-template-fg top-[2px] -left-[10mm]"></div>
        <span class="w-1/3 font-medium italic">Total</span>
        <span class="w-1/6 text-right font-extralight">
          ${data.currency} ${data.amount}
        </span>
      </footer>
    </section>
  </main>
`;
