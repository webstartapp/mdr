# MDR & QMS Core Logic

This document defines the regulatory logic and Quality Management System (QMS) requirements that the advisor system must follow.

## 1. Regulatory Scope
- **EU MDR 2017/745**: Medical Device Regulation.
- **EU IVDR 2017/746**: In Vitro Diagnostic Medical Device Regulation.
- **ISO 13485:2016**: Quality Management Systems for Medical Devices.
- **ISO 14971:2019**: Risk Management for Medical Devices.

## 2. Classification Logic
The AI Advisor must classify devices based on the Annex VIII (MDR) or Annex II (IVDR) rules:
- **Class I**: Low risk (e.g., wheelchairs, standard bandages).
- **Class IIa**: Medium risk (e.g., hearing aids, short-term catheters).
- **Class IIb**: Medium-high risk (e.g., ventilators, orthopedic implants).
- **Class III**: High risk (e.g., pacemakers, heart valves).

## 3. Technical File Structure
The system helps users build the technical documentation according to Annex II and III of the MDR:
- **Device Description & Specification**.
- **Information to be supplied by the Manufacturer** (Labels, IFU).
- **Design and Manufacturing Information**.
- **General Safety and Performance Requirements (GSPR)**.
- **Risk Management File**.
- **Verification & Validation Reports** (Clinical Evaluation, Biocompatibility, etc.).

## 4. QMS Requirements (ISO 13485)
Core processes that the system must track for compliance:
- Document Control & Record Control.
- Corrective and Preventive Actions (CAPA).
- Post-Market Surveillance (PMS).
- Design and Development Controls.
- Management Review.

## 5. AI Advisor Constraints
- The advisor MUST cite specific Articles or Annexes when providing advice.
- It must clearly distinguish between "Compliance Guidance" and "Legal Advice" (Standard disclaimer required).
- Content edits in the Admin panel via Gemma should prioritize regulatory accuracy over stylistic flair.
